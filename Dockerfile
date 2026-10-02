FROM nginx:alpine
COPY . /usr/share/nginx/html
# SPA-ish fallback not needed; static HTML tree
RUN rm -f /usr/share/nginx/html/Dockerfile /usr/share/nginx/html/.dockerignore /usr/share/nginx/html/README.md 2>/dev/null || true
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
