export default function Footer() {
  return (
    <footer className="py-10 bg-bg-dark border-t border-[rgba(0,240,255,0.06)]">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10">
        <p className="font-body text-sm text-text-secondary text-center">
          &copy; {new Date().getFullYear()} Abdullah. All rights reserved.{" "}
          <span className="text-amber-accent">&lt;3</span>
        </p>
      </div>
    </footer>
  );
}
