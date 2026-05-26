const SectionTitle = ({
  title,
  paragraph,
  width = "600px",
  center,
  mb = "20px",
}: {
  title: string;
  paragraph: string;
  width?: string;
  center?: boolean;
  mb?: string;
}) => {
  return (
    <>
      <div
        className={`w-full ${center ? "mx-auto max-w-175 text-center" : ""}`}
        style={{ maxWidth: width, marginBottom: mb }}
      >
        <h2 className="mb-2 text-lg md:text-xl lg:text-2xl font-bold leading-tight! text-black dark:text-white">
          {title}
        </h2>
        <p className="text-xs leading-relaxed! text-muted-foreground md:text-sm">
          {paragraph}
        </p>
      </div>
    </>
  );
};

export default SectionTitle;
