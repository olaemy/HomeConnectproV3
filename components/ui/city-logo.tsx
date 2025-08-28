interface CityLogoProps {
  className?: string
  size?: number
}

export function CityLogo({ className = "", size = 24 }: CityLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Base line */}
      <rect x="8" y="72" width="104" height="3" fill="currentColor" />

      {/* Building 1 - Leftmost short */}
      <rect x="12" y="55" width="12" height="17" fill="currentColor" />
      <rect x="14" y="57" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="17" y="57" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="14" y="61" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="17" y="61" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="14" y="65" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="17" y="65" width="2" height="2" fill="white" opacity="0.8" />

      {/* Building 2 - Medium left */}
      <rect x="26" y="42" width="14" height="30" fill="currentColor" />
      <rect x="28" y="45" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="32" y="45" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="36" y="45" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="28" y="50" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="32" y="50" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="36" y="50" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="28" y="55" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="32" y="55" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="36" y="55" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="28" y="60" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="32" y="60" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="36" y="60" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="28" y="65" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="32" y="65" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="36" y="65" width="2" height="2" fill="white" opacity="0.8" />

      {/* Building 3 - Tallest center */}
      <rect x="42" y="25" width="16" height="47" fill="currentColor" />
      <rect x="45" y="28" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="49" y="28" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="53" y="28" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="45" y="33" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="49" y="33" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="53" y="33" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="45" y="38" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="49" y="38" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="53" y="38" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="45" y="43" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="49" y="43" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="53" y="43" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="45" y="48" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="49" y="48" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="53" y="48" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="45" y="53" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="49" y="53" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="53" y="53" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="45" y="58" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="49" y="58" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="53" y="58" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="45" y="63" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="49" y="63" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="53" y="63" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="45" y="68" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="49" y="68" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="53" y="68" width="2" height="2" fill="white" opacity="0.8" />

      {/* Building 4 - Medium right */}
      <rect x="60" y="38" width="14" height="34" fill="currentColor" />
      <rect x="62" y="41" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="66" y="41" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="70" y="41" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="62" y="46" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="66" y="46" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="70" y="46" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="62" y="51" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="66" y="51" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="70" y="51" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="62" y="56" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="66" y="56" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="70" y="56" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="62" y="61" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="66" y="61" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="70" y="61" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="62" y="66" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="66" y="66" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="70" y="66" width="2" height="2" fill="white" opacity="0.8" />

      {/* Building 5 - Tall right */}
      <rect x="76" y="30" width="15" height="42" fill="currentColor" />
      <rect x="78" y="33" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="82" y="33" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="86" y="33" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="78" y="38" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="82" y="38" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="86" y="38" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="78" y="43" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="82" y="43" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="86" y="43" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="78" y="48" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="82" y="48" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="86" y="48" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="78" y="53" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="82" y="53" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="86" y="53" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="78" y="58" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="82" y="58" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="86" y="58" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="78" y="63" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="82" y="63" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="86" y="63" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="78" y="68" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="82" y="68" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="86" y="68" width="2" height="2" fill="white" opacity="0.8" />

      {/* Building 6 - Short right */}
      <rect x="93" y="50" width="12" height="22" fill="currentColor" />
      <rect x="95" y="53" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="99" y="53" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="95" y="58" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="99" y="58" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="95" y="63" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="99" y="63" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="95" y="68" width="2" height="2" fill="white" opacity="0.8" />
      <rect x="99" y="68" width="2" height="2" fill="white" opacity="0.8" />
    </svg>
  )
}
