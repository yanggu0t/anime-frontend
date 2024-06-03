import createNextIntlPlugin from "next-intl/plugin";
import { withNextVideo } from "next-video/process";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default withNextVideo(withNextIntl(nextConfig));
