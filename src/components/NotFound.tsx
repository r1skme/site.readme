import { useLanguage, L } from '@/lib/i18n';
import { ActionLink } from '@/components/Primitives';

/** The one 404 view: unknown paths and unknown project slugs. */
export default function NotFound({ backTo = '/' }: { backTo?: '/' | '/projects/' }) {
  const { t } = useLanguage();
  return (
    <section className="shell not-found">
      <p className="not-found-code" aria-hidden="true">
        404
      </p>
      <h1>{t(L('Страница не найдена', 'Page not found'))}</h1>
      <p className="lead">
        {t(
          L(
            'Такой страницы нет. Возможно, ссылка устарела.',
            'This page does not exist. The link may be out of date.',
          ),
        )}
      </p>
      <ActionLink to={backTo}>
        {backTo === '/' ? t(L('На главную', 'Back home')) : t(L('Все проекты', 'All projects'))}
      </ActionLink>
    </section>
  );
}
