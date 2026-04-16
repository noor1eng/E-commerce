import { toast } from "sonner";

export function useSonner() {
  return (text) => {
    toast(text, {
      description: "",
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  };
}
