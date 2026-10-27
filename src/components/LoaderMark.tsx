import ElectricLogo from '@/components/ui/electric-logo';
import { useMotionPreference } from '@/lib/motion';

/** The GitHub mark with lightning running along its edge. The static silhouette sits
 * underneath, so it is all that shows without WebGL2 or with reduced motion. */
export function LoaderMark({ size = 260 }: { size?: number }) {
  const { paused } = useMotionPreference();
  // Also read the media query directly: the boot overlay renders outside MotionProvider.
  const still = paused || matchMedia('(prefers-reduced-motion: reduce)').matches;
  return (
    <div className="loader-mark" style={{ width: size, height: size }} aria-hidden="true">
      <img className="loader-mark-static" src="/assets/github-mark.svg" alt="" />
      {!still && (
        <ElectricLogo
          src="/assets/github-mark.svg"
          color="#e6f7ff"
          glowColor="#5fdcf0"
          scale={0.62}
          strands={4}
          bend={0.5}
          crackle={1.3}
          arcs={1}
          speed={2.2}
          interactive={false}
          className="loader-mark-electric"
        />
      )}
    </div>
  );
}
