export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/trips",
        "/reservations",
        "/properties",
        "/favorites",
        "/claimReport",
        "/reportCase",
        "/voting",
        "/host",
        "/host/reservations",
        "/host/properties",
        "/host/claimReport"
    ]
}