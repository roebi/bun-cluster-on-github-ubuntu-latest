FROM ubuntu:24.04

# Install dependencies and curl
RUN apt-get update && \
    apt-get install -y curl ca-certificates build-essential git && \
    rm -rf /var/lib/apt/lists/*

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash

# Add Bun to PATH for non-interactive shells
ENV BUN_INSTALL=/root/.bun
ENV PATH="${BUN_INSTALL}/bin:${PATH}"

WORKDIR /app

# Copy project files
COPY package.json ./
COPY server.ts cluster.ts ./

# Install dependencies (none here, but this ensures bun has its cache etc.)
RUN bun install

# App port
ENV PORT=8080
EXPOSE 8080

# Use cluster launcher by default
CMD ["bun", "cluster.ts"]
