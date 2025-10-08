export const useAppTheme = () => {
  const theme = useState<"default" | "sand" | "artic">(
    "app-theme",
    () => "default"
  );

  const setTheme = (newTheme: "default" | "sand" | "artic") => {
    theme.value = newTheme;
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return {
    setTheme,
    currentTheme: computed(() => theme.value),
  };
};
