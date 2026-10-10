<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application architecture
- Keep each oilfield content section in its own TanStack route and share the operations shell, so navigation remains addressable and layouts stay section-specific.
- Load ECharts dynamically after mount and apply complete options with notMerge and overrides last, so SSR stays browser-safe and stale chart configuration cannot leak between views.
- Source chart colors from the CSS semantic tokens and observe chart container resizing, so charts match the glass design system at all viewport sizes.
- Use explicit local demonstration data until live oilfield services are requested, so the dashboard does not imply a real monitoring connection.
