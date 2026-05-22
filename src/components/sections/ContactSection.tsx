import type { ReactNode } from "react";
import { useState } from "react";
import {
  IconArrowRight,
  IconCheck,
  IconLoader2,
  IconMail,
  IconMapPin,
  IconPhone,
} from "@tabler/icons-react";
import { siteConfig } from "../../constants/site";

const contactFormEndpoint =
  import.meta.env.VITE_CONTACT_FORM_ENDPOINT ?? "contact.php";
const contactFormTimeoutMs = 15000;

type SubmitStatus =
  | { type: "idle"; message: "" }
  | { type: "success" | "error"; message: string };

type ContactFormSubmitEvent = {
  preventDefault: () => void;
  currentTarget: HTMLFormElement;
};

type ContactFormResponse = {
  success?: boolean;
  message?: string;
};

export function ContactSection() {
  const hasAddress = siteConfig.address.length > 0;
  const [status, setStatus] = useState<SubmitStatus>({ type: "idle", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: ContactFormSubmitEvent) {
    event.preventDefault();

    const currentForm = event.currentTarget;
    const form = new FormData(currentForm);
    const name = form.get("name")?.toString().trim();
    const phone = form.get("phone")?.toString().trim();
    const email = form.get("email")?.toString().trim();
    const service = form.get("service")?.toString().trim();
    const message = form.get("message")?.toString().trim();
    const website = form.get("website")?.toString().trim();

    setIsSubmitting(true);
    setStatus({ type: "idle", message: "" });

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => {
      controller.abort();
    }, contactFormTimeoutMs);

    try {
      const response = await fetch(contactFormEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          name,
          email,
          phone,
          website,
          message: [
            service ? `Služba: ${service}` : null,
            message ? `Poznámka: ${message}` : null,
          ]
            .filter(Boolean)
            .join("\n\n"),
        }),
      });

      const { data, hasInvalidJson } = await readContactFormResponse(response);

      if (!response.ok || data?.success === false) {
        throw new Error(getServerErrorMessage(response, data?.message));
      }

      if (hasInvalidJson) {
        throw new Error(
          "Zprávu se nepodařilo potvrdit, protože server vrátil nečitelnou odpověď. Zkuste to prosím znovu nebo nás kontaktujte přímo.",
        );
      }

      setStatus({
        type: "success",
        message: data?.message ?? "Zpráva byla úspěšně odeslána.",
      });
      currentForm.reset();
    } catch (error) {
      setStatus({
        type: "error",
        message: getSubmitErrorMessage(error),
      });
    } finally {
      window.clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  }

  return (
    <section
      id="contact"
      className="bg-(--section-bg) px-5 py-16 md:px-12 lg:px-16"
    >
      <div className="grid overflow-hidden rounded-3xl bg-white shadow-[0_25px_80px_rgba(6,26,52,0.1)] lg:grid-cols-[0.75fr_1.35fr_0.8fr]">
        <div className="bg-[#f4efe7] p-9">
          <h2 className="font-serif text-5xl leading-tight">Požadavek na zavolání</h2>
          <p className="mt-6 leading-7 text-[#061a34]/65">
            Vyplňte telefon a e-mail. Ozveme se vám zpět co nejdříve a probereme,
            co potřebujete vyřešit.
          </p>

          <div className="mt-8 space-y-3 text-sm leading-6 text-[#061a34]/65">
            <p>Pojištění, úvěry, hypotéky, investice i servis smluv.</p>
            <p>Telefonicky i osobně. Bez zbytečného obcházení institucí.</p>
          </div>

          <div className="mt-8 h-px w-14 bg-[#c89750]" />
        </div>

        <form className="grid gap-4 p-9" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <input
              name="name"
              className="input"
              placeholder="Jméno (nepovinné)"
            />
            <input
              name="phone"
              type="tel"
              className="input"
              placeholder="Telefon"
              required
            />
            <input
              name="email"
              type="email"
              className="input"
              placeholder="E-mail"
              required
            />
            <select name="service" className="input" defaultValue="">
              <option value="">Vyberte službu</option>
              <option>Pojištění</option>
              <option>Autopojištění</option>
              <option>Hypotéky</option>
              <option>Úvěry a refinancování</option>
              <option>Investice a servis smluv</option>
              <option>Jiné</option>
            </select>
          </div>

          <textarea
            name="message"
            className="input min-h-36 resize-none"
            placeholder="Stručně napište, co potřebujete řešit"
            required
          />

          <input
            type="text"
            name="website"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-md text-sm leading-6 text-[#061a34]/55">
              Po odeslání dorazí požadavek přímo na {siteConfig.email}. Přímý
              kontakt najdete vedle formuláře.
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="contact-submit-button relative inline-flex min-w-46 items-center justify-center gap-3 overflow-hidden rounded-full bg-[#061a34] px-7 py-4 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(6,26,52,0.18)] transition hover:bg-[#0b274b] disabled:cursor-not-allowed"
              data-state={
                isSubmitting
                  ? "loading"
                  : status.type === "success"
                    ? "success"
                    : "idle"
              }
            >
              <span className="contact-submit-shine" aria-hidden="true" />
              <span className="relative z-10">
                {isSubmitting
                  ? "Odesílám..."
                  : status.type === "success"
                    ? "Odesláno"
                    : "Odeslat požadavek"}
              </span>
              <span className="relative z-10 flex size-5 items-center justify-center">
                {isSubmitting ? (
                  <IconLoader2 className="contact-submit-spinner" size={18} stroke={1.9} />
                ) : status.type === "success" ? (
                  <IconCheck size={18} stroke={2.1} />
                ) : (
                  <IconArrowRight size={17} stroke={1.8} />
                )}
              </span>
            </button>
          </div>

          {status.type !== "idle" ? (
            <div
              aria-live="polite"
              className={
                status.type === "success"
                  ? "rounded-3xl border border-green-200 bg-green-50 p-5 text-green-900 shadow-[0_16px_38px_rgba(15,122,79,0.1)]"
                  : "rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
              }
            >
              {status.type === "success" ? (
                <div className="flex gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-green-600 text-white">
                    <IconCheck size={22} stroke={2.2} />
                  </div>
                  <div>
                    <p className="font-serif text-2xl leading-tight">
                      Děkujeme, požadavek jsme přijali.
                    </p>
                    <p className="mt-2 text-sm leading-6 text-green-900/75">
                      Ozveme se vám co nejdříve. Mezitím si můžete připravit
                      aktuální smlouvy nebo základní informace k požadavku.
                    </p>
                  </div>
                </div>
              ) : (
                status.message
              )}
            </div>
          ) : null}
        </form>

        <div className="border-l border-[#061a34]/10 p-9">
          <h3 className="font-serif text-2xl">Další způsoby kontaktu</h3>

          <div className="mt-7 space-y-5 text-sm text-[#061a34]/65">
            <ContactLine
              icon={<IconPhone size={18} />}
              text={siteConfig.phone}
              href={siteConfig.phoneHref}
            />
            <ContactLine
              icon={<IconMail size={18} />}
              text={siteConfig.email}
              href={siteConfig.emailHref}
            />
            {hasAddress ? (
              <ContactLine
                icon={<IconMapPin size={18} />}
                text={siteConfig.address.join(", ")}
              />
            ) : null}
          </div>

          <div className="mt-8 rounded-3xl bg-[#061a34] p-6 text-white">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c89750]">
              Orientační kalkulace
            </p>
            <h4 className="mt-4 font-serif text-2xl leading-tight">
              Autopojištění i úvěr řešíme s vámi osobně.
            </h4>
            <p className="mt-3 text-sm leading-7 text-white/68">
              Online kalkulačky můžeme doplnit v další fázi. Zatím vám připravíme
              orientační nabídku podle vaší situace.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

type ContactLineProps = {
  icon: ReactNode;
  text: string;
  href?: string;
};

async function readContactFormResponse(response: Response) {
  const responseText = await response.text();

  if (responseText.trim() === "") {
    return {
      data: null,
      hasInvalidJson: response.ok,
    };
  }

  try {
    return {
      data: JSON.parse(responseText) as ContactFormResponse,
      hasInvalidJson: false,
    };
  } catch {
    return {
      data: null,
      hasInvalidJson: response.ok,
    };
  }
}

function getServerErrorMessage(response: Response, serverMessage?: string) {
  const messageFromServer = getUsefulServerMessage(serverMessage);

  if (response.ok) {
    return (
      messageFromServer ??
      "Zprávu se nepodařilo odeslat, protože server nepotvrdil doručení e-mailu. Zkuste to prosím znovu nebo nás kontaktujte přímo."
    );
  }

  if (response.status === 400) {
    return (
      messageFromServer ??
      "Zprávu se nepodařilo odeslat, protože formulář obsahuje neplatné nebo neúplné údaje. Zkontrolujte prosím jméno, e-mail a zprávu."
    );
  }

  if (response.status === 401 || response.status === 403) {
    return (
      messageFromServer ??
      "Zprávu se nepodařilo odeslat, protože server požadavek odmítl. Zkuste prosím obnovit stránku nebo nás kontaktujte přímo."
    );
  }

  if (response.status === 404) {
    return "Zprávu se nepodařilo odeslat, protože odesílací adresa formuláře nebyla na serveru nalezena.";
  }

  if (response.status === 405) {
    return "Zprávu se nepodařilo odeslat, protože server nepovoluje odeslání formuláře touto metodou.";
  }

  if (response.status === 408) {
    return "Zprávu se nepodařilo odeslat, protože server neodpověděl včas. Zkuste to prosím znovu.";
  }

  if (response.status === 413) {
    return "Zprávu se nepodařilo odeslat, protože je příliš dlouhá. Zkraťte prosím text zprávy a odešlete formulář znovu.";
  }

  if (response.status === 429) {
    return "Zprávu se nepodařilo odeslat, protože bylo odesláno příliš mnoho požadavků za krátkou dobu. Zkuste to prosím za chvíli.";
  }

  if (response.status >= 500) {
    return (
      messageFromServer ??
      `Zprávu se nepodařilo odeslat z důvodu chyby serveru. Zkuste to prosím později nebo nám napište přímo na ${siteConfig.email}.`
    );
  }

  return (
    messageFromServer ??
    `Zprávu se nepodařilo odeslat. Server odpověděl stavem ${response.status}. Zkuste to prosím znovu nebo nás kontaktujte přímo.`
  );
}

function getSubmitErrorMessage(error: unknown) {
  if (error instanceof DOMException && error.name === "AbortError") {
    return "Zprávu se nepodařilo odeslat, protože server neodpověděl včas. Zkontrolujte prosím připojení a zkuste to znovu.";
  }

  if (error instanceof TypeError) {
    return "Zprávu se nepodařilo odeslat, protože se nepodařilo spojit se serverem. Může jít o výpadek připojení, nedostupný server nebo blokované CORS nastavení.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Zprávu se nepodařilo odeslat z neznámého důvodu. Zkuste to prosím znovu nebo nás kontaktujte přímo.";
}

function getUsefulServerMessage(serverMessage?: string) {
  const trimmedMessage = serverMessage?.trim();

  if (!trimmedMessage) {
    return undefined;
  }

  const normalizedMessage = trimmedMessage.toLocaleLowerCase("cs-CZ");

  if (
    normalizedMessage === "zprávu se nepodařilo odeslat." ||
    normalizedMessage === "zprávu se nepodařilo odeslat"
  ) {
    return undefined;
  }

  return trimmedMessage;
}

function ContactLine({ icon, text, href }: ContactLineProps) {
  const content = (
    <>
      <span className="text-[#c89750]">{icon}</span>
      <span>{text}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} className="flex gap-3 transition hover:text-[#061a34]">
        {content}
      </a>
    );
  }

  return <div className="flex gap-3">{content}</div>;
}
