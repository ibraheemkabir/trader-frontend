import TimeAgo from 'javascript-time-ago';
 
// Load locale-specific relative date/time formatting rules.
import en from 'javascript-time-ago/locale/en';
 
export const util = '';

// Add locale-specific relative date/time formatting rules.
TimeAgo.addLocale(en)
 
// Create relative date/time formatter.
export const timeAgo = new TimeAgo('en-US')