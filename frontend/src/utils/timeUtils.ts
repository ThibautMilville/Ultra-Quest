export const translateDuration = (duration: string, t: (key: any) => string): string => {
  // Cas spécial pour "ended"
  if (duration.toLowerCase() === 'ended') {
    return t('quest.duration.ended');
  }

  // Regex pour capturer les différents formats de durée
  const patterns = [
    { regex: /(\d+)\s*weeks?/i, key: 'weeks' },
    { regex: /(\d+)\s*days?/i, key: 'days' },
    { regex: /(\d+)D/i, key: 'days' },
    { regex: /(\d+)H/i, key: 'hours' },
    { regex: /(\d+)M/i, key: 'minutes' },
    { regex: /(\d+)\s*hours?/i, key: 'hours' },
    { regex: /(\d+)\s*minutes?/i, key: 'minutes' }
  ];

  let translatedDuration = duration;

  // Traiter chaque pattern
  for (const pattern of patterns) {
    const match = duration.match(pattern.regex);
    if (match) {
      const number = parseInt(match[1]);
      const isPlural = number > 1;
      const translationKey = isPlural ? `quest.duration.${pattern.key}` : `quest.duration.${pattern.key.slice(0, -1)}`;
      const translatedUnit = t(translationKey);
      
      // Remplacer dans la chaîne
      if (pattern.regex.source.includes('\\s*')) {
        // Format avec espaces (ex: "3 weeks")
        translatedDuration = translatedDuration.replace(pattern.regex, `${number} ${translatedUnit}`);
      } else {
        // Format compact (ex: "3D", "17H")
        translatedDuration = translatedDuration.replace(pattern.regex, `${number}${translatedUnit.charAt(0).toUpperCase()}`);
      }
    }
  }

  return translatedDuration;
}; 