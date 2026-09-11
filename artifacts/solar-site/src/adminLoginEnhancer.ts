const ADMIN_PATH = "/admin";
const AUTH_EVENT = "wm-admin-auth-state";

type AuthPayload = {
  success?: boolean;
  message?: string;
  retryAfter?: number;
  auth?: {
    failedAttempts?: number;
    attemptsRemaining?: number;
    maxAttempts?: number;
    retryAfter?: number;
    blocked?: boolean;
  };
};

type AuthEventDetail = {
  phase: "loading" | "result" | "network-error";
  status?: number;
  data?: AuthPayload;
};

function isAdminPage() {
  return window.location.pathname.replace(/\/$/, "") === ADMIN_PATH;
}

function isLoginRequest(input: RequestInfo | URL, init?: RequestInit) {
  const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
  if (!url.includes("/api/admin-content") || init?.method?.toUpperCase() !== "POST") return false;

  if (typeof init.body !== "string") return false;

  try {
    return JSON.parse(init.body)?.action === "login";
  } catch {
    return false;
  }
}

function emit(detail: AuthEventDetail) {
  window.dispatchEvent(new CustomEvent<AuthEventDetail>(AUTH_EVENT, { detail }));
}

if (typeof window !== "undefined" && isAdminPage()) {
  const nativeFetch = window.fetch.bind(window);

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const loginRequest = isLoginRequest(input, init);

    if (loginRequest) emit({ phase: "loading" });

    try {
      const response = await nativeFetch(input, init);

      if (loginRequest) {
        let data: AuthPayload = {};
        try {
          data = await response.clone().json();
        } catch {
          data = {};
        }
        emit({ phase: "result", status: response.status, data });
      }

      return response;
    } catch (error) {
      if (loginRequest) emit({ phase: "network-error" });
      throw error;
    }
  };

  const style = document.createElement("style");
  style.id = "wm-admin-login-style";
  style.textContent = `
    @keyframes wmAdminEnter { from { opacity: 0; transform: translateY(18px) scale(.985); } to { opacity: 1; transform: none; } }
    @keyframes wmAdminShake { 0%,100% { transform: translateX(0); } 22% { transform: translateX(-7px); } 44% { transform: translateX(6px); } 66% { transform: translateX(-4px); } 88% { transform: translateX(2px); } }
    @keyframes wmAdminPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(239,68,68,.18); } 50% { box-shadow: 0 0 0 7px rgba(239,68,68,0); } }
    @keyframes wmAdminSpin { to { transform: rotate(360deg); } }
    @keyframes wmAdminFloat { 0%,100% { transform: translate3d(0,0,0); } 50% { transform: translate3d(0,-12px,0); } }

    body:has([data-wm-admin-login="true"]) { overflow: hidden; }
    main:has([data-wm-admin-login="true"]) {
      position: relative;
      isolation: isolate;
      overflow: hidden;
      background:
        radial-gradient(circle at 20% 10%, rgba(249,115,22,.19), transparent 32%),
        radial-gradient(circle at 82% 82%, rgba(14,165,233,.14), transparent 34%),
        linear-gradient(145deg, #07111d 0%, #0b1726 47%, #07101b 100%) !important;
    }
    main:has([data-wm-admin-login="true"])::before,
    main:has([data-wm-admin-login="true"])::after {
      content: "";
      position: absolute;
      width: 22rem;
      height: 22rem;
      border-radius: 999px;
      filter: blur(80px);
      opacity: .22;
      pointer-events: none;
      z-index: -1;
      animation: wmAdminFloat 9s ease-in-out infinite;
    }
    main:has([data-wm-admin-login="true"])::before { background: #f97316; top: -11rem; left: -7rem; }
    main:has([data-wm-admin-login="true"])::after { background: #0ea5e9; bottom: -12rem; right: -7rem; animation-delay: -4s; }

    [data-wm-admin-login="true"] {
      width: min(100%, 440px) !important;
      padding: 34px !important;
      border-radius: 28px !important;
      border: 1px solid rgba(255,255,255,.72) !important;
      background: rgba(255,255,255,.965) !important;
      box-shadow: 0 30px 90px rgba(0,0,0,.38), 0 1px 0 rgba(255,255,255,.9) inset !important;
      backdrop-filter: blur(18px);
      animation: wmAdminEnter .5s cubic-bezier(.2,.8,.2,1) both;
    }
    [data-wm-admin-login="true"][data-state="error"] { animation: wmAdminShake .38s ease both; }

    .wm-admin-brand {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 24px;
    }
    .wm-admin-brand img {
      width: 46px;
      height: 46px;
      object-fit: contain;
      border-radius: 14px;
      background: #0f172a;
      padding: 7px;
      box-shadow: 0 8px 24px rgba(15,23,42,.16);
    }
    .wm-admin-brand-copy strong { display:block; color:#0f172a; font-size:14px; line-height:1.2; }
    .wm-admin-brand-copy span { display:block; margin-top:3px; color:#64748b; font-size:12px; }

    [data-wm-admin-login="true"] h1 {
      margin: 0 0 8px !important;
      color: #0f172a;
      font-size: clamp(1.75rem, 5vw, 2.2rem) !important;
      letter-spacing: -.045em;
      line-height: 1.05;
    }
    .wm-admin-subtitle { margin: 0 0 26px; color:#64748b; font-size:14px; line-height:1.6; }
    .wm-admin-label { display:block; margin:0 0 8px; color:#334155; font-size:13px; font-weight:800; }

    [data-wm-admin-login="true"] input[type="password"] {
      width: 100%;
      height: 52px;
      margin: 0 !important;
      padding: 0 15px !important;
      border: 1px solid #cbd5e1 !important;
      border-radius: 14px !important;
      background: #f8fafc !important;
      color: #0f172a !important;
      outline: none;
      transition: border-color .2s ease, box-shadow .2s ease, background .2s ease;
    }
    [data-wm-admin-login="true"] input[type="password"]:focus {
      border-color: #f97316 !important;
      background: #fff !important;
      box-shadow: 0 0 0 4px rgba(249,115,22,.12) !important;
    }
    [data-wm-admin-login="true"][data-state="error"] input[type="password"] {
      border-color: #ef4444 !important;
      box-shadow: 0 0 0 4px rgba(239,68,68,.08) !important;
    }

    .wm-admin-feedback {
      display: none;
      margin-top: 12px;
      padding: 12px 13px;
      border-radius: 13px;
      font-size: 13px;
      line-height: 1.45;
      font-weight: 650;
    }
    .wm-admin-feedback[data-visible="true"] { display:block; animation: wmAdminEnter .25s ease both; }
    .wm-admin-feedback[data-tone="error"] { color:#991b1b; background:#fef2f2; border:1px solid #fecaca; }
    .wm-admin-feedback[data-tone="blocked"] { color:#9a3412; background:#fff7ed; border:1px solid #fed7aa; animation: wmAdminPulse 1.8s ease infinite; }
    .wm-admin-feedback[data-tone="neutral"] { color:#334155; background:#f8fafc; border:1px solid #e2e8f0; }

    .wm-admin-attempts { margin: 15px 0 18px; }
    .wm-admin-attempts-head { display:flex; align-items:center; justify-content:space-between; gap:12px; color:#64748b; font-size:12px; }
    .wm-admin-attempts-head strong { color:#334155; }
    .wm-admin-dots { display:grid; grid-template-columns:repeat(5,1fr); gap:6px; margin-top:8px; }
    .wm-admin-dot { height:5px; border-radius:999px; background:#e2e8f0; transition:background .25s ease, transform .25s ease; }
    .wm-admin-dot[data-used="true"] { background:#ef4444; transform:scaleY(1.25); }

    [data-wm-admin-login="true"] button[type="submit"] {
      position: relative;
      height: 52px;
      border-radius: 14px !important;
      background: linear-gradient(135deg, #f97316, #ea580c) !important;
      box-shadow: 0 12px 28px rgba(234,88,12,.22);
      transition: transform .2s ease, box-shadow .2s ease, opacity .2s ease;
    }
    [data-wm-admin-login="true"] button[type="submit"]:hover:not(:disabled) { transform: translateY(-1px); box-shadow:0 16px 32px rgba(234,88,12,.28); }
    [data-wm-admin-login="true"] button[type="submit"]:active:not(:disabled) { transform: translateY(0); }
    [data-wm-admin-login="true"] button[type="submit"]:disabled { cursor:not-allowed; opacity:.62; }
    [data-wm-admin-login="true"] button[type="submit"][data-loading="true"]::before {
      content:"";
      display:inline-block;
      width:16px;
      height:16px;
      margin-right:9px;
      vertical-align:-3px;
      border-radius:50%;
      border:2px solid rgba(255,255,255,.45);
      border-top-color:#fff;
      animation:wmAdminSpin .75s linear infinite;
    }
    .wm-admin-security-note { margin:16px 0 0; color:#94a3b8; text-align:center; font-size:11px; line-height:1.5; }

    @media (max-width: 520px) {
      [data-wm-admin-login="true"] { padding: 26px 22px !important; border-radius: 24px !important; }
    }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; }
    }
  `;
  document.head.appendChild(style);

  let remainingSeconds = 0;
  let countdownTimer: number | null = null;

  function formatCountdown(total: number) {
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function enhanceLoginForm() {
    if (!isAdminPage()) return;

    const form = document.querySelector("main form") as HTMLFormElement | null;
    if (!form || form.dataset.wmAdminLogin === "true") return;

    const heading = form.querySelector("h1");
    const input = form.querySelector('input[type="password"]') as HTMLInputElement | null;
    const button = form.querySelector('button[type="submit"]') as HTMLButtonElement | null;
    if (!heading || !input || !button) return;

    form.dataset.wmAdminLogin = "true";
    form.dataset.state = "idle";

    const brand = document.createElement("div");
    brand.className = "wm-admin-brand";
    const logo = document.createElement("img");
    logo.src = "/uploads/1782522774045-wm2.png";
    logo.alt = "WM Solares";
    const brandCopy = document.createElement("div");
    brandCopy.className = "wm-admin-brand-copy";
    const brandName = document.createElement("strong");
    brandName.textContent = "WM Solares";
    const brandMeta = document.createElement("span");
    brandMeta.textContent = "Área administrativa protegida";
    brandCopy.append(brandName, brandMeta);
    brand.append(logo, brandCopy);
    form.insertBefore(brand, heading);

    const subtitle = document.createElement("p");
    subtitle.className = "wm-admin-subtitle";
    subtitle.textContent = "Entre com sua credencial administrativa para gerenciar o conteúdo do site.";
    heading.insertAdjacentElement("afterend", subtitle);

    const label = document.createElement("label");
    label.className = "wm-admin-label";
    label.textContent = "Senha administrativa";
    label.htmlFor = "wm-admin-password";
    input.id = "wm-admin-password";
    input.autocomplete = "current-password";
    input.setAttribute("aria-describedby", "wm-admin-feedback");
    input.insertAdjacentElement("beforebegin", label);

    const feedback = document.createElement("div");
    feedback.id = "wm-admin-feedback";
    feedback.className = "wm-admin-feedback";
    feedback.dataset.visible = "false";
    feedback.dataset.tone = "neutral";
    feedback.setAttribute("role", "status");
    feedback.setAttribute("aria-live", "polite");
    input.insertAdjacentElement("afterend", feedback);

    const attempts = document.createElement("div");
    attempts.className = "wm-admin-attempts";
    attempts.innerHTML = `
      <div class="wm-admin-attempts-head"><span>Tentativas de acesso</span><strong data-wm-attempt-copy>5 restantes</strong></div>
      <div class="wm-admin-dots" aria-hidden="true">${Array.from({ length: 5 }, () => '<span class="wm-admin-dot"></span>').join("")}</div>
    `;
    feedback.insertAdjacentElement("afterend", attempts);

    const securityNote = document.createElement("p");
    securityNote.className = "wm-admin-security-note";
    securityNote.textContent = "Acesso monitorado e protegido contra tentativas repetidas. Nenhuma senha é armazenada no navegador.";
    button.insertAdjacentElement("afterend", securityNote);

    function renderAttempts(failed = 0, remaining = 5, max = 5) {
      const copy = attempts.querySelector("[data-wm-attempt-copy]");
      if (copy) copy.textContent = remaining === 1 ? "1 restante" : `${remaining} restantes`;
      attempts.querySelectorAll(".wm-admin-dot").forEach((dot, index) => {
        (dot as HTMLElement).dataset.used = String(index < Math.min(failed, max));
      });
    }

    function stopCountdown() {
      if (countdownTimer !== null) window.clearInterval(countdownTimer);
      countdownTimer = null;
      remainingSeconds = 0;
    }

    function startCountdown(seconds: number) {
      stopCountdown();
      remainingSeconds = Math.max(1, Math.ceil(seconds));
      button.disabled = true;
      form.dataset.state = "blocked";
      feedback.dataset.visible = "true";
      feedback.dataset.tone = "blocked";

      const tick = () => {
        feedback.textContent = `Acesso temporariamente bloqueado. Tente novamente em ${formatCountdown(remainingSeconds)}.`;
        button.textContent = `Bloqueado · ${formatCountdown(remainingSeconds)}`;
        remainingSeconds -= 1;

        if (remainingSeconds < 0) {
          stopCountdown();
          form.dataset.state = "idle";
          feedback.dataset.tone = "neutral";
          feedback.textContent = "Você já pode tentar novamente.";
          button.disabled = false;
          button.textContent = "Entrar com segurança";
          renderAttempts(0, 5, 5);
        }
      };

      tick();
      countdownTimer = window.setInterval(tick, 1000);
    }

    input.addEventListener("input", () => {
      if (remainingSeconds > 0) return;
      if (form.dataset.state === "error") {
        form.dataset.state = "idle";
        feedback.dataset.visible = "false";
      }
    });

    window.addEventListener(AUTH_EVENT, ((event: CustomEvent<AuthEventDetail>) => {
      const detail = event.detail;

      if (detail.phase === "loading") {
        form.dataset.state = "loading";
        feedback.dataset.visible = "false";
        button.disabled = true;
        button.dataset.loading = "true";
        button.textContent = "Verificando acesso...";
        return;
      }

      button.dataset.loading = "false";

      if (detail.phase === "network-error") {
        form.dataset.state = "error";
        button.disabled = false;
        button.textContent = "Tentar novamente";
        feedback.dataset.visible = "true";
        feedback.dataset.tone = "error";
        feedback.textContent = "Não foi possível verificar o acesso. Confira sua conexão e tente novamente.";
        return;
      }

      const data = detail.data || {};
      const auth = data.auth || {};
      const maxAttempts = Number(auth.maxAttempts || 5);
      const failedAttempts = Number(auth.failedAttempts || 0);
      const attemptsRemaining = Number(auth.attemptsRemaining ?? maxAttempts);
      renderAttempts(failedAttempts, attemptsRemaining, maxAttempts);

      if (data.success) {
        stopCountdown();
        form.dataset.state = "success";
        button.disabled = true;
        button.textContent = "Acesso autorizado";
        feedback.dataset.visible = "true";
        feedback.dataset.tone = "neutral";
        feedback.textContent = "Credencial validada. Abrindo o painel...";
        return;
      }

      if (detail.status === 429 || auth.blocked) {
        startCountdown(Number(auth.retryAfter || data.retryAfter || 60));
        return;
      }

      form.dataset.state = "error";
      window.setTimeout(() => {
        if (form.dataset.state === "error") form.dataset.state = "idle";
      }, 450);
      button.disabled = false;
      button.textContent = "Tentar novamente";
      feedback.dataset.visible = "true";
      feedback.dataset.tone = "error";
      feedback.textContent = attemptsRemaining > 0
        ? `Senha incorreta. Você ainda tem ${attemptsRemaining} ${attemptsRemaining === 1 ? "tentativa" : "tentativas"}.`
        : "Senha incorreta. Limite de tentativas atingido.";
    }) as EventListener);

    button.textContent = "Entrar com segurança";
  }

  const observer = new MutationObserver(enhanceLoginForm);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("DOMContentLoaded", enhanceLoginForm, { once: true });
  window.setTimeout(enhanceLoginForm, 0);
}
