import { type NextConfig } from 'next'

import { withTranslations } from "@repo/i18n/plugin"

const nextConfig: NextConfig = {}

export default withTranslations('./request-config.ts', nextConfig)
