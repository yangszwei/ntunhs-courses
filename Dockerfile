FROM node:18-slim
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM node:18-slim
ENV LANG C.UTF-8
RUN apt-get update \
	&& apt-get install -y wget gnupg \
	&& wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
	&& sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
	&& apt-get update \
	&& apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
		--no-install-recommends \
	&& rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY ./package*.json ./
COPY ./data ./data
RUN npm ci --omit-dev \
	&& groupadd -r appuser && useradd -r -g appuser -G audio,video appuser \
	&& mkdir -p tmp \
	&& chown -R appuser:appuser node_modules \
	&& chown -R appuser:appuser package.json \
	&& chown -R appuser:appuser package-lock.json \
	&& chown -R appuser:appuser tmp
USER appuser
COPY --from=0 /app/build ./build
EXPOSE 3000
CMD ["node", "build"]
