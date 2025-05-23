import moment from 'moment';

export interface DateFormatOptions {
  useRelativeTime?: boolean;
  relativeThreshold?: number;
  format?: string;
}

/**
 * Formate une date avec des options configurables
 * @param date - La date à formater
 * @param options - Options de formatage
 * @returns La date formatée
 */
export const formatDate = (
  date: Date | string,
  options: DateFormatOptions = {}
): string => {
  const {
    useRelativeTime = true,
    relativeThreshold = 3,
    format = 'LLL'
  } = options;

  const now = moment();
  const messageDate = moment(date);
  const diffDays = now.diff(messageDate, 'days');

  if (useRelativeTime && diffDays < relativeThreshold) {
    return messageDate.fromNow();
  }

  return messageDate.format(format);
};

/**
 * Vérifie si une date est récente (dans les dernières 24 heures)
 * @param date - La date à vérifier
 * @returns boolean
 */
export const isRecentDate = (date: Date | string): boolean => {
  const now = moment();
  const messageDate = moment(date);
  return now.diff(messageDate, 'hours') < 24;
};

/**
 * Formate une date pour l'affichage dans un titre ou un en-tête
 * @param date - La date à formater
 * @returns La date formatée
 */
export const formatDateForHeader = (date: Date | string): string => {
  return formatDate(date, {
    useRelativeTime: true,
    relativeThreshold: 7,
    format: 'dddd D MMMM YYYY'
  });
}; 