// The dashboard must render instantly: no blocking fetch here. A slow Beszel
// hub used to hold this page's SSR (and therefore the navigation) hostage.
// The page fetches /api/status from the client after mount and shows skeleton
// placeholders until the data arrives.
export const prerender = false;
