"use client";

import { ExternalLink } from "lucide-react";
import { useState } from "react";

interface LinkPreviewProps {
  url: string;
  title: string;
}

function getDisplayUrl(url: string) {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/').filter(Boolean);
    return pathParts.length > 0 ? `${urlObj.hostname}/${pathParts[pathParts.length - 1]}` : urlObj.hostname;
  } catch {
    return url;
  }
}

export function LinkPreview({ url, title }: LinkPreviewProps) {
  const [imageError, setImageError] = useState(false);
  const displayUrl = getDisplayUrl(url);
  const domain = new URL(url).hostname.replace('www.', '');
  
  // Get favicon from domain
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;

  return (
    <div className="border rounded-lg overflow-hidden hover:border-primary transition-colors bg-card">
      <a 
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 group p-3"
      >
        <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-muted rounded">
          {!imageError ? (
            <img
              src={faviconUrl}
              alt={domain}
              className="w-4 h-4"
              onError={() => setImageError(true)}
            />
          ) : (
            <ExternalLink className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-1">
            {title}
          </h4>
          <p className="text-xs text-muted-foreground mt-1 truncate">
            {displayUrl}
          </p>
        </div>
      </a>
    </div>
  );
} 