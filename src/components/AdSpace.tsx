import { Card } from "@/components/ui/card";

export function AdSpace({ adCode }: { adCode?: string }) {
  if (adCode && adCode.trim() !== '') {
    return (
      <div 
        className="w-full flex justify-center overflow-hidden"
        dangerouslySetInnerHTML={{ __html: adCode }}
      />
    );
  }

  // Reklam kodu yoksa hiçbir şey gösterme
  return null;
}
