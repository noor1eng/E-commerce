import { toast } from "sonner";
export function SonnerDemo({ text }) {
  toast(text, {
    description: text,
    action: {
      label: "Undo",
      onClick: () => console.log("Undo"),
    },
  });
}
