export function createPOIPopup(poi: any) {
  return `
    <div class="p-3 max-w-[300px]">
      <h3 class="text-lg font-semibold mb-2">${poi.poi?.name || 'Unnamed Location'}</h3>
      
      <div class="space-y-2">
        <p class="text-sm text-muted-foreground">
          ${poi.address?.freeformAddress || ''}
        </p>
        
        ${poi.poi?.categories?.map((cat: any) => `
          <span class="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
            ${cat.name}
          </span>
        `).join(' ') || ''}
        
        ${poi.poi?.phone ? `
          <p class="text-sm flex items-center gap-2">
            <span class="text-muted-foreground">📞</span>
            <a href="tel:${poi.poi.phone}" class="hover:underline">${poi.poi.phone}</a>
          </p>
        ` : ''}
        
        ${poi.poi?.url ? `
          <p class="text-sm flex items-center gap-2">
            <span class="text-muted-foreground">🌐</span>
            <a href="${poi.poi.url}" target="_blank" class="text-blue-600 hover:underline">Website</a>
          </p>
        ` : ''}
      </div>
    </div>
  `
} 