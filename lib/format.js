// 148 -> ১৪৮, 1850 -> ১,৮৫০
export function toBn(number) {
  return Number(number).toLocaleString("bn-BD");
}

// "kg" -> "প্রতি কেজি"
export function unitLabel(unit) {
  const units = {
    kg: "প্রতি কেজি",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
  };
  return units[unit] || unit;
}

// Today's date in Bangla
export function todayBn() {
  return new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });
}

// 2.1 -> ২.১, 0 -> ০.০ (always one decimal, no minus sign)
export function pctBn(pct) {
  return Math.abs(pct).toLocaleString("bn-BD", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}