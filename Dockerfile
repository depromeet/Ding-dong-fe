# 위에서 도커 허브 node 이미지를 기반으로 로컬로 다운로드 및 캐싱 되었기 때문에 이미지를 가져올 수 있다.
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

# 만약 컨테이너 안의 이미지의 경로가 /app 이런식으로 되어있다면 작업할 div 경로를 설정할 수도 있다.
# 설정해주면 COPY 의 두번째 경로를 ./ 이것으로 했을 때 자동으로 /app 경로가 된다.
WORKDIR /app

# package.json 파일을 복사한다. 만약 다시 빌드할 때 변경사항이 없을 경우 npm install까지 그냥 넘어간다.
#COPY package.json /app
COPY package.json pnpm-lock.yaml ./

# 이미지를 받으면 npm install을 자동으로 해줌
#RUN npm install
RUN npm install -g pnpm && pnpm install

# 어떤 파일이 이미지에 들어가야 하는지
# 첫 번째 .은 이 프로젝트의 모든 폴더 및 파일들 (Dockerfile을 제외한)
# 두 번째 .은 파일을 저장할 컨테이너 내부 경로 (ex /app)
#COPY . /app

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# This will do the trick, use the corresponding env file for each environment.
COPY .env.development .env.production
RUN yarn build

# RUN pnpm run build # pnpm 없다고 안됨. 하긴... 위에서 설치한 pnpm이랑은 별개의 이미지라서 그런듯.
FROM base AS runner
WORKDIR /app

# 배포환경으로 설정
#ENV NODE_ENV=production
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

#RUN npm run build
#
## 도케에게 우리가 서버를 실행할 포트를 말해준다.
#EXPOSE 3000

# 이미지가 생성될 때 실행되지 않고 컨테이너가 실행될 때 수행하는 명령어
#CMD ["npm","start"]
CMD ["node", "server.js"]