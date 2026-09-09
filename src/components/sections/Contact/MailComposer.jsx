import { useId, useState } from 'react';
import { useTranslation } from '../../../i18n/useTranslation.js';
import { profile } from '../../../data/profile.js';
import { PixelButton } from '../../ui/PixelButton/PixelButton.jsx';
import styles from './MailComposer.module.css';

const REASON_IDS = ['job', 'collab', 'freelance', 'question', 'other'];
const SUBJECT_MAX = 120;
const BODY_MAX = 1500;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Construye la URL mailto: con el motivo y los datos del remitente
 * antepuestos al cuerpo, para que lleguen aunque el cliente de correo
 * no muestre "Responder a" de forma clara.
 */
function buildMailto({ to, subject, body, reasonLabel, name, replyTo, reasonPrefix, fromPrefix }) {
  const header = [`[${reasonPrefix}] ${reasonLabel}`, `[${fromPrefix}] ${name} <${replyTo}>`, '-'.repeat(30)].join(
    '\r\n',
  );
  const fullBody = `${header}\r\n${body}`;
  const params = new URLSearchParams();
  params.set('subject', subject);
  params.set('body', fullBody);
  // URLSearchParams codifica espacios como "+"; mailto: los espera como %20.
  return `mailto:${to}?${params.toString().replace(/\+/g, '%20')}`;
}

/**
 * Formulario de contacto con estética de cliente de correo retro. Al enviar,
 * abre el cliente de correo del visitante (mailto:) con asunto y cuerpo
 * prellenados, anteponiendo el motivo de contacto seleccionado.
 *
 * @param {object} props
 * @param {() => void} props.onSent - se llama tras generar el mailto: (correo realmente enviado).
 * @param {() => void} props.onCancel - se llama al pulsar "cancelar", sin enviar nada.
 */
export function MailComposer({ onSent, onCancel }) {
  const { t } = useTranslation();
  const idPrefix = useId();
  const [form, setForm] = useState({
    name: '',
    replyTo: '',
    reason: REASON_IDS[0],
    subject: '',
    body: '',
  });
  const [errors, setErrors] = useState({});

  const setField = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = t('contact.modal.errorRequired');
    if (!form.replyTo.trim()) next.replyTo = t('contact.modal.errorRequired');
    else if (!EMAIL_RE.test(form.replyTo.trim())) next.replyTo = t('contact.modal.errorEmail');
    if (!form.subject.trim()) next.subject = t('contact.modal.errorRequired');
    if (!form.body.trim()) next.body = t('contact.modal.errorRequired');
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const mailtoUrl = buildMailto({
      to: profile.links.email,
      subject: form.subject.trim(),
      body: form.body.trim(),
      reasonLabel: t(`contact.modal.reason.${form.reason}`),
      name: form.name.trim(),
      replyTo: form.replyTo.trim(),
      reasonPrefix: t('contact.modal.bodyReasonPrefix'),
      fromPrefix: t('contact.modal.bodyFromPrefix'),
    });

    window.location.href = mailtoUrl;
    onSent?.();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.toRow}>
        <span className={styles.toLabel}>{t('contact.modal.to')}:</span>
        <span className={styles.toValue}>{profile.links.email}</span>
      </div>

      <fieldset className={styles.field}>
        <legend className={styles.label}>{t('contact.modal.reasonLabel')}</legend>
        <div
          className={styles.reasons}
          role="radiogroup"
          aria-label={t('contact.modal.reasonLabel')}
          onKeyDown={(e) => {
            if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(e.key)) return;
            e.preventDefault();
            const dir = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1;
            const currentIndex = REASON_IDS.indexOf(form.reason);
            const nextId = REASON_IDS.at((currentIndex + dir) % REASON_IDS.length);
            setForm((f) => ({ ...f, reason: nextId }));
            e.currentTarget.querySelector(`[data-reason="${nextId}"]`)?.focus();
          }}
        >
          {REASON_IDS.map((id) => (
            <button
              key={id}
              type="button"
              role="radio"
              data-reason={id}
              aria-checked={form.reason === id}
              tabIndex={form.reason === id ? 0 : -1}
              className={[styles.reasonBtn, form.reason === id ? styles.reasonActive : ''].join(' ')}
              onClick={() => setForm((f) => ({ ...f, reason: id }))}
            >
              {t(`contact.modal.reason.${id}`)}
            </button>
          ))}
        </div>
      </fieldset>

      <div className={styles.row}>
        <Field
          id={`${idPrefix}-name`}
          label={t('contact.modal.nameLabel')}
          placeholder={t('contact.modal.namePlaceholder')}
          value={form.name}
          onChange={setField('name')}
          error={errors.name}
        />
        <Field
          id={`${idPrefix}-replyTo`}
          label={t('contact.modal.replyToLabel')}
          placeholder={t('contact.modal.replyToPlaceholder')}
          value={form.replyTo}
          onChange={setField('replyTo')}
          error={errors.replyTo}
          type="email"
        />
      </div>

      <Field
        id={`${idPrefix}-subject`}
        label={t('contact.modal.subjectLabel')}
        placeholder={t('contact.modal.subjectPlaceholder')}
        value={form.subject}
        onChange={setField('subject')}
        error={errors.subject}
        maxLength={SUBJECT_MAX}
      />

      <div className={styles.field}>
        <label className={styles.label} htmlFor={`${idPrefix}-body`}>
          {t('contact.modal.bodyLabel')}
        </label>
        <textarea
          id={`${idPrefix}-body`}
          className={styles.textarea}
          rows={5}
          maxLength={BODY_MAX}
          placeholder={t('contact.modal.bodyPlaceholder')}
          value={form.body}
          onChange={setField('body')}
          aria-invalid={Boolean(errors.body)}
          aria-describedby={errors.body ? `${idPrefix}-body-error` : undefined}
        />
        <div className={styles.footerRow}>
          {errors.body ? (
            <span id={`${idPrefix}-body-error`} className={styles.error}>
              {errors.body}
            </span>
          ) : (
            <span />
          )}
          <span className={styles.count}>
            {t('contact.modal.charCount', { count: form.body.length, max: BODY_MAX })}
          </span>
        </div>
      </div>

      <div className={styles.actions}>
        <PixelButton type="button" variant="pink" size="sm" onClick={onCancel}>
          {t('contact.modal.cancel')}
        </PixelButton>
        <PixelButton type="submit" variant="green" size="sm">
          {t('contact.modal.send')}
        </PixelButton>
      </div>
    </form>
  );
}

function Field({ id, label, error, maxLength, ...inputProps }) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className={styles.input}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        {...inputProps}
      />
      {error && (
        <span id={`${id}-error`} className={styles.error}>
          {error}
        </span>
      )}
    </div>
  );
}
