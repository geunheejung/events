/** @type {import('next').NextConfig} */
const nextConfig = {
  // 실험적 기능을 사용. 모든 실험적 기능은 향후 브레이킹 체인지가 적용될 수 있음.
  experimental: {
    // 앱 라우터(앱 디렉터리)는 레이아웃, 서버 구성 요소, 스트리밍 및 공동 배치 데이터 가져오기를 지원함.
    appDir: true,
  },
  // 이러면 webpack 설정을 override 가능한 듯.
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
};

module.exports = nextConfig;
