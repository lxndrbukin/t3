export default function Section({
  header,
  children,
}: {
  header: string;
  children: React.ReactNode;
}) {
  return (
    <div className='section'>
      <h1 className='section-header'>{header}</h1>
      {children}
    </div>
  );
}
