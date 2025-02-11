import { ReactNode } from "react";

export function GuideInfoBox(props: { children: ReactNode }) {
  return (
    <div className="max-w-[600px] w-full overflow-hidden flex-col gap-4 flex my-8 mx-auto bg-muted/50 rounded-xl p-6 backdrop-blur-sm border border-primary/10">
      <div className="flex items-center justify-center gap-2">
        <div className="text-2xl font-medium bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">
          Aveiro
        </div>
        <div className="w-px h-6 bg-primary/20" />
        <div className="text-2xl font-medium bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Connect
        </div>
      </div>

      <div className="text-sm mx-auto text-center text-muted-foreground space-y-4">
        {props.children}
      </div>

      <div className="flex justify-center gap-2 mt-2">
        <div className="w-1 h-1 rounded-full bg-primary/40" />
        <div className="w-1 h-1 rounded-full bg-primary/40" />
        <div className="w-1 h-1 rounded-full bg-primary/40" />
      </div>
    </div>
  );
}
