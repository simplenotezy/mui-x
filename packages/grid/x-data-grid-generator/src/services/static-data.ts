import { blue, green, lightBlue, orange, pink, purple, red } from '@mui/material/colors';

export const COLORS = [
  pink[500],
  blue[500],
  orange[500],
  red[500],
  green[500],
  lightBlue[500],
  purple[500],
];

export const STATUS_OPTIONS = ['Open', 'PartiallyFilled', 'Filled', 'Rejected'];
export const TAXCODE_OPTIONS = ['BR', '1250L', '20G', 'BC45', 'IGN179'];
export const RATE_TYPE_OPTIONS = ['Fixed', 'Floating'];
export const CONTRACT_TYPE_OPTIONS = ['FP', 'TM', 'CR'];
export const INCOTERM_OPTIONS = [
  'EXW (Ex Works)',
  'FAS (Free Alongside Ship)',
  'FCA (Free Carrier)',
  'CPT (Carriage Paid To)',
  'DAP (Delivered at Place)',
  'DPU (Delivered at Place Unloaded)',
  'DDP (Delivered Duty Paid)',
];
export const COMMODITY_OPTIONS = [
  'Corn',
  'Oats',
  'Rough Rice',
  'Soybeans',
  'Rapeseed',
  'Soybeans',
  'Soybean Meal',
  'Soybean Oil',
  'Wheat',
  'Milk',
  'Cocoa',
  'Coffee C',
  'Cotton No.2',
  'Sugar No.11',
  'Sugar No.14',
  'Frozen Concentrated Orange Juice',
  'Adzuki bean',
  'Robusta coffee',
];

export const CURRENCY_OPTIONS = [
  'USD',
  'GBP',
  'JPY',
  'EUR',
  'BRL',
  'MXN',
  'AUD',
  'CAD',
  'NZD',
  'ARS',
  'CHF',
  'THB',
  'HKD',
  'TRY',
];
export const COUNTRY_OPTIONS = [
  'United States',
  'United Kingdom',
  'Japan',
  'France',
  'Brazil',
  'Mexico',
  'Australia',
  'Canada',
  'New Zealand',
  'Argentina',
  'Switzerland',
  'Thailand',
  'Hong Kong',
  'Turkey',
];
export const COUNTRY_ISO_OPTIONS = [
  { value: 'AD', code: 'AD', label: 'Andorra', phone: '376' },
  { value: 'AE', code: 'AE', label: 'United Arab Emirates', phone: '971' },
  { value: 'AF', code: 'AF', label: 'Afghanistan', phone: '93' },
  { value: 'AG', code: 'AG', label: 'Antigua and Barbuda', phone: '1-268' },
  { value: 'AI', code: 'AI', label: 'Anguilla', phone: '1-264' },
  { value: 'AL', code: 'AL', label: 'Albania', phone: '355' },
  { value: 'AM', code: 'AM', label: 'Armenia', phone: '374' },
  { value: 'AO', code: 'AO', label: 'Angola', phone: '244' },
  { value: 'AQ', code: 'AQ', label: 'Antarctica', phone: '672' },
  { value: 'AR', code: 'AR', label: 'Argentina', phone: '54' },
  { value: 'AS', code: 'AS', label: 'American Samoa', phone: '1-684' },
  { value: 'AT', code: 'AT', label: 'Austria', phone: '43' },
  { value: 'AU', code: 'AU', label: 'Australia', phone: '61', suggested: true },
  { value: 'AW', code: 'AW', label: 'Aruba', phone: '297' },
  { value: 'AX', code: 'AX', label: 'Alland Islands', phone: '358' },
  { value: 'AZ', code: 'AZ', label: 'Azerbaijan', phone: '994' },
  { value: 'BA', code: 'BA', label: 'Bosnia and Herzegovina', phone: '387' },
  { value: 'BB', code: 'BB', label: 'Barbados', phone: '1-246' },
  { value: 'BD', code: 'BD', label: 'Bangladesh', phone: '880' },
  { value: 'BE', code: 'BE', label: 'Belgium', phone: '32' },
  { value: 'BF', code: 'BF', label: 'Burkina Faso', phone: '226' },
  { value: 'BG', code: 'BG', label: 'Bulgaria', phone: '359' },
  { value: 'BH', code: 'BH', label: 'Bahrain', phone: '973' },
  { value: 'BI', code: 'BI', label: 'Burundi', phone: '257' },
  { value: 'BJ', code: 'BJ', label: 'Benin', phone: '229' },
  { value: 'BL', code: 'BL', label: 'Saint Barthelemy', phone: '590' },
  { value: 'BM', code: 'BM', label: 'Bermuda', phone: '1-441' },
  { value: 'BN', code: 'BN', label: 'Brunei Darussalam', phone: '673' },
  { value: 'BO', code: 'BO', label: 'Bolivia', phone: '591' },
  { value: 'BR', code: 'BR', label: 'Brazil', phone: '55' },
  { value: 'BS', code: 'BS', label: 'Bahamas', phone: '1-242' },
  { value: 'BT', code: 'BT', label: 'Bhutan', phone: '975' },
  { value: 'BV', code: 'BV', label: 'Bouvet Island', phone: '47' },
  { value: 'BW', code: 'BW', label: 'Botswana', phone: '267' },
  { value: 'BY', code: 'BY', label: 'Belarus', phone: '375' },
  { value: 'BZ', code: 'BZ', label: 'Belize', phone: '501' },
  { value: 'CA', code: 'CA', label: 'Canada', phone: '1', suggested: true },
  { value: 'CC', code: 'CC', label: 'Cocos (Keeling) Islands', phone: '61' },
  { value: 'CD', code: 'CD', label: 'Congo, Democratic Republic of the', phone: '243' },
  { value: 'CF', code: 'CF', label: 'Central African Republic', phone: '236' },
  { value: 'CG', code: 'CG', label: 'Congo, Republic of the', phone: '242' },
  { value: 'CH', code: 'CH', label: 'Switzerland', phone: '41' },
  { value: 'CI', code: 'CI', label: "Cote d'Ivoire", phone: '225' },
  { value: 'CK', code: 'CK', label: 'Cook Islands', phone: '682' },
  { value: 'CL', code: 'CL', label: 'Chile', phone: '56' },
  { value: 'CM', code: 'CM', label: 'Cameroon', phone: '237' },
  { value: 'CN', code: 'CN', label: 'China', phone: '86' },
  { value: 'CO', code: 'CO', label: 'Colombia', phone: '57' },
  { value: 'CR', code: 'CR', label: 'Costa Rica', phone: '506' },
  { value: 'CU', code: 'CU', label: 'Cuba', phone: '53' },
  { value: 'CV', code: 'CV', label: 'Cape Verde', phone: '238' },
  { value: 'CW', code: 'CW', label: 'Curacao', phone: '599' },
  { value: 'CX', code: 'CX', label: 'Christmas Island', phone: '61' },
  { value: 'CY', code: 'CY', label: 'Cyprus', phone: '357' },
  { value: 'CZ', code: 'CZ', label: 'Czech Republic', phone: '420' },
  { value: 'DE', code: 'DE', label: 'Germany', phone: '49', suggested: true },
  { value: 'DJ', code: 'DJ', label: 'Djibouti', phone: '253' },
  { value: 'DK', code: 'DK', label: 'Denmark', phone: '45' },
  { value: 'DM', code: 'DM', label: 'Dominica', phone: '1-767' },
  { value: 'DO', code: 'DO', label: 'Dominican Republic', phone: '1-809' },
  { value: 'DZ', code: 'DZ', label: 'Algeria', phone: '213' },
  { value: 'EC', code: 'EC', label: 'Ecuador', phone: '593' },
  { value: 'EE', code: 'EE', label: 'Estonia', phone: '372' },
  { value: 'EG', code: 'EG', label: 'Egypt', phone: '20' },
  { value: 'EH', code: 'EH', label: 'Western Sahara', phone: '212' },
  { value: 'ER', code: 'ER', label: 'Eritrea', phone: '291' },
  { value: 'ES', code: 'ES', label: 'Spain', phone: '34' },
  { value: 'ET', code: 'ET', label: 'Ethiopia', phone: '251' },
  { value: 'FI', code: 'FI', label: 'Finland', phone: '358' },
  { value: 'FJ', code: 'FJ', label: 'Fiji', phone: '679' },
  { value: 'FK', code: 'FK', label: 'Falkland Islands (Malvinas)', phone: '500' },
  { value: 'FM', code: 'FM', label: 'Micronesia, Federated States of', phone: '691' },
  { value: 'FO', code: 'FO', label: 'Faroe Islands', phone: '298' },
  { value: 'FR', code: 'FR', label: 'France', phone: '33', suggested: true },
  { value: 'GA', code: 'GA', label: 'Gabon', phone: '241' },
  { value: 'GB', code: 'GB', label: 'United Kingdom', phone: '44' },
  { value: 'GD', code: 'GD', label: 'Grenada', phone: '1-473' },
  { value: 'GE', code: 'GE', label: 'Georgia', phone: '995' },
  { value: 'GF', code: 'GF', label: 'French Guiana', phone: '594' },
  { value: 'GG', code: 'GG', label: 'Guernsey', phone: '44' },
  { value: 'GH', code: 'GH', label: 'Ghana', phone: '233' },
  { value: 'GI', code: 'GI', label: 'Gibraltar', phone: '350' },
  { value: 'GL', code: 'GL', label: 'Greenland', phone: '299' },
  { value: 'GM', code: 'GM', label: 'Gambia', phone: '220' },
  { value: 'GN', code: 'GN', label: 'Guinea', phone: '224' },
  { value: 'GP', code: 'GP', label: 'Guadeloupe', phone: '590' },
  { value: 'GQ', code: 'GQ', label: 'Equatorial Guinea', phone: '240' },
  { value: 'GR', code: 'GR', label: 'Greece', phone: '30' },
  { value: 'GS', code: 'GS', label: 'South Georgia and the South Sandwich Islands', phone: '500' },
  { value: 'GT', code: 'GT', label: 'Guatemala', phone: '502' },
  { value: 'GU', code: 'GU', label: 'Guam', phone: '1-671' },
  { value: 'GW', code: 'GW', label: 'Guinea-Bissau', phone: '245' },
  { value: 'GY', code: 'GY', label: 'Guyana', phone: '592' },
  { value: 'HK', code: 'HK', label: 'Hong Kong', phone: '852' },
  { value: 'HM', code: 'HM', label: 'Heard Island and McDonald Islands', phone: '672' },
  { value: 'HN', code: 'HN', label: 'Honduras', phone: '504' },
  { value: 'HR', code: 'HR', label: 'Croatia', phone: '385' },
  { value: 'HT', code: 'HT', label: 'Haiti', phone: '509' },
  { value: 'HU', code: 'HU', label: 'Hungary', phone: '36' },
  { value: 'ID', code: 'ID', label: 'Indonesia', phone: '62' },
  { value: 'IE', code: 'IE', label: 'Ireland', phone: '353' },
  { value: 'IL', code: 'IL', label: 'Israel', phone: '972' },
  { value: 'IM', code: 'IM', label: 'Isle of Man', phone: '44' },
  { value: 'IN', code: 'IN', label: 'India', phone: '91' },
  { value: 'IO', code: 'IO', label: 'British Indian Ocean Territory', phone: '246' },
  { value: 'IQ', code: 'IQ', label: 'Iraq', phone: '964' },
  { value: 'IR', code: 'IR', label: 'Iran, Islamic Republic of', phone: '98' },
  { value: 'IS', code: 'IS', label: 'Iceland', phone: '354' },
  { value: 'IT', code: 'IT', label: 'Italy', phone: '39' },
  { value: 'JE', code: 'JE', label: 'Jersey', phone: '44' },
  { value: 'JM', code: 'JM', label: 'Jamaica', phone: '1-876' },
  { value: 'JO', code: 'JO', label: 'Jordan', phone: '962' },
  { value: 'JP', code: 'JP', label: 'Japan', phone: '81', suggested: true },
  { value: 'KE', code: 'KE', label: 'Kenya', phone: '254' },
  { value: 'KG', code: 'KG', label: 'Kyrgyzstan', phone: '996' },
  { value: 'KH', code: 'KH', label: 'Cambodia', phone: '855' },
  { value: 'KI', code: 'KI', label: 'Kiribati', phone: '686' },
  { value: 'KM', code: 'KM', label: 'Comoros', phone: '269' },
  { value: 'KN', code: 'KN', label: 'Saint Kitts and Nevis', phone: '1-869' },
  { value: 'KP', code: 'KP', label: "Korea, Democratic People's Republic of", phone: '850' },
  { value: 'KR', code: 'KR', label: 'Korea, Republic of', phone: '82' },
  { value: 'KW', code: 'KW', label: 'Kuwait', phone: '965' },
  { value: 'KY', code: 'KY', label: 'Cayman Islands', phone: '1-345' },
  { value: 'KZ', code: 'KZ', label: 'Kazakhstan', phone: '7' },
  { value: 'LA', code: 'LA', label: "Lao People's Democratic Republic", phone: '856' },
  { value: 'LB', code: 'LB', label: 'Lebanon', phone: '961' },
  { value: 'LC', code: 'LC', label: 'Saint Lucia', phone: '1-758' },
  { value: 'LI', code: 'LI', label: 'Liechtenstein', phone: '423' },
  { value: 'LK', code: 'LK', label: 'Sri Lanka', phone: '94' },
  { value: 'LR', code: 'LR', label: 'Liberia', phone: '231' },
  { value: 'LS', code: 'LS', label: 'Lesotho', phone: '266' },
  { value: 'LT', code: 'LT', label: 'Lithuania', phone: '370' },
  { value: 'LU', code: 'LU', label: 'Luxembourg', phone: '352' },
  { value: 'LV', code: 'LV', label: 'Latvia', phone: '371' },
  { value: 'LY', code: 'LY', label: 'Libya', phone: '218' },
  { value: 'MA', code: 'MA', label: 'Morocco', phone: '212' },
  { value: 'MC', code: 'MC', label: 'Monaco', phone: '377' },
  { value: 'MD', code: 'MD', label: 'Moldova, Republic of', phone: '373' },
  { value: 'ME', code: 'ME', label: 'Montenegro', phone: '382' },
  { value: 'MF', code: 'MF', label: 'Saint Martin (French part)', phone: '590' },
  { value: 'MG', code: 'MG', label: 'Madagascar', phone: '261' },
  { value: 'MH', code: 'MH', label: 'Marshall Islands', phone: '692' },
  { value: 'MK', code: 'MK', label: 'Macedonia, the Former Yugoslav Republic of', phone: '389' },
  { value: 'ML', code: 'ML', label: 'Mali', phone: '223' },
  { value: 'MM', code: 'MM', label: 'Myanmar', phone: '95' },
  { value: 'MN', code: 'MN', label: 'Mongolia', phone: '976' },
  { value: 'MO', code: 'MO', label: 'Macao', phone: '853' },
  { value: 'MP', code: 'MP', label: 'Northern Mariana Islands', phone: '1-670' },
  { value: 'MQ', code: 'MQ', label: 'Martinique', phone: '596' },
  { value: 'MR', code: 'MR', label: 'Mauritania', phone: '222' },
  { value: 'MS', code: 'MS', label: 'Montserrat', phone: '1-664' },
  { value: 'MT', code: 'MT', label: 'Malta', phone: '356' },
  { value: 'MU', code: 'MU', label: 'Mauritius', phone: '230' },
  { value: 'MV', code: 'MV', label: 'Maldives', phone: '960' },
  { value: 'MW', code: 'MW', label: 'Malawi', phone: '265' },
  { value: 'MX', code: 'MX', label: 'Mexico', phone: '52' },
  { value: 'MY', code: 'MY', label: 'Malaysia', phone: '60' },
  { value: 'MZ', code: 'MZ', label: 'Mozambique', phone: '258' },
  { value: 'NA', code: 'NA', label: 'Namibia', phone: '264' },
  { value: 'NC', code: 'NC', label: 'New Caledonia', phone: '687' },
  { value: 'NE', code: 'NE', label: 'Niger', phone: '227' },
  { value: 'NF', code: 'NF', label: 'Norfolk Island', phone: '672' },
  { value: 'NG', code: 'NG', label: 'Nigeria', phone: '234' },
  { value: 'NI', code: 'NI', label: 'Nicaragua', phone: '505' },
  { value: 'NL', code: 'NL', label: 'Netherlands', phone: '31' },
  { value: 'NO', code: 'NO', label: 'Norway', phone: '47' },
  { value: 'NP', code: 'NP', label: 'Nepal', phone: '977' },
  { value: 'NR', code: 'NR', label: 'Nauru', phone: '674' },
  { value: 'NU', code: 'NU', label: 'Niue', phone: '683' },
  { value: 'NZ', code: 'NZ', label: 'New Zealand', phone: '64' },
  { value: 'OM', code: 'OM', label: 'Oman', phone: '968' },
  { value: 'PA', code: 'PA', label: 'Panama', phone: '507' },
  { value: 'PE', code: 'PE', label: 'Peru', phone: '51' },
  { value: 'PF', code: 'PF', label: 'French Polynesia', phone: '689' },
  { value: 'PG', code: 'PG', label: 'Papua New Guinea', phone: '675' },
  { value: 'PH', code: 'PH', label: 'Philippines', phone: '63' },
  { value: 'PK', code: 'PK', label: 'Pakistan', phone: '92' },
  { value: 'PL', code: 'PL', label: 'Poland', phone: '48' },
  { value: 'PM', code: 'PM', label: 'Saint Pierre and Miquelon', phone: '508' },
  { value: 'PN', code: 'PN', label: 'Pitcairn', phone: '870' },
  { value: 'PR', code: 'PR', label: 'Puerto Rico', phone: '1' },
  { value: 'PS', code: 'PS', label: 'Palestine, State of', phone: '970' },
  { value: 'PT', code: 'PT', label: 'Portugal', phone: '351' },
  { value: 'PW', code: 'PW', label: 'Palau', phone: '680' },
  { value: 'PY', code: 'PY', label: 'Paraguay', phone: '595' },
  { value: 'QA', code: 'QA', label: 'Qatar', phone: '974' },
  { value: 'RE', code: 'RE', label: 'Reunion', phone: '262' },
  { value: 'RO', code: 'RO', label: 'Romania', phone: '40' },
  { value: 'RS', code: 'RS', label: 'Serbia', phone: '381' },
  { value: 'RU', code: 'RU', label: 'Russian Federation', phone: '7' },
  { value: 'RW', code: 'RW', label: 'Rwanda', phone: '250' },
  { value: 'SA', code: 'SA', label: 'Saudi Arabia', phone: '966' },
  { value: 'SB', code: 'SB', label: 'Solomon Islands', phone: '677' },
  { value: 'SC', code: 'SC', label: 'Seychelles', phone: '248' },
  { value: 'SD', code: 'SD', label: 'Sudan', phone: '249' },
  { value: 'SE', code: 'SE', label: 'Sweden', phone: '46' },
  { value: 'SG', code: 'SG', label: 'Singapore', phone: '65' },
  { value: 'SH', code: 'SH', label: 'Saint Helena', phone: '290' },
  { value: 'SI', code: 'SI', label: 'Slovenia', phone: '386' },
  { value: 'SJ', code: 'SJ', label: 'Svalbard and Jan Mayen', phone: '47' },
  { value: 'SK', code: 'SK', label: 'Slovakia', phone: '421' },
  { value: 'SL', code: 'SL', label: 'Sierra Leone', phone: '232' },
  { value: 'SM', code: 'SM', label: 'San Marino', phone: '378' },
  { value: 'SN', code: 'SN', label: 'Senegal', phone: '221' },
  { value: 'SO', code: 'SO', label: 'Somalia', phone: '252' },
  { value: 'SR', code: 'SR', label: 'Suriname', phone: '597' },
  { value: 'SS', code: 'SS', label: 'South Sudan', phone: '211' },
  { value: 'ST', code: 'ST', label: 'Sao Tome and Principe', phone: '239' },
  { value: 'SV', code: 'SV', label: 'El Salvador', phone: '503' },
  { value: 'SX', code: 'SX', label: 'Sint Maarten (Dutch part)', phone: '1-721' },
  { value: 'SY', code: 'SY', label: 'Syrian Arab Republic', phone: '963' },
  { value: 'SZ', code: 'SZ', label: 'Swaziland', phone: '268' },
  { value: 'TC', code: 'TC', label: 'Turks and Caicos Islands', phone: '1-649' },
  { value: 'TD', code: 'TD', label: 'Chad', phone: '235' },
  { value: 'TF', code: 'TF', label: 'French Southern Territories', phone: '262' },
  { value: 'TG', code: 'TG', label: 'Togo', phone: '228' },
  { value: 'TH', code: 'TH', label: 'Thailand', phone: '66' },
  { value: 'TJ', code: 'TJ', label: 'Tajikistan', phone: '992' },
  { value: 'TK', code: 'TK', label: 'Tokelau', phone: '690' },
  { value: 'TL', code: 'TL', label: 'Timor-Leste', phone: '670' },
  { value: 'TM', code: 'TM', label: 'Turkmenistan', phone: '993' },
  { value: 'TN', code: 'TN', label: 'Tunisia', phone: '216' },
  { value: 'TO', code: 'TO', label: 'Tonga', phone: '676' },
  { value: 'TR', code: 'TR', label: 'Turkey', phone: '90' },
  { value: 'TT', code: 'TT', label: 'Trinidad and Tobago', phone: '1-868' },
  { value: 'TV', code: 'TV', label: 'Tuvalu', phone: '688' },
  { value: 'TW', code: 'TW', label: 'Taiwan, Province of China', phone: '886' },
  { value: 'TZ', code: 'TZ', label: 'United Republic of Tanzania', phone: '255' },
  { value: 'UA', code: 'UA', label: 'Ukraine', phone: '380' },
  { value: 'UG', code: 'UG', label: 'Uganda', phone: '256' },
  { value: 'US', code: 'US', label: 'United States', phone: '1', suggested: true },
  { value: 'UY', code: 'UY', label: 'Uruguay', phone: '598' },
  { value: 'UZ', code: 'UZ', label: 'Uzbekistan', phone: '998' },
  { value: 'VA', code: 'VA', label: 'Holy See (Vatican City State)', phone: '379' },
  { value: 'VC', code: 'VC', label: 'Saint Vincent and the Grenadines', phone: '1-784' },
  { value: 'VE', code: 'VE', label: 'Venezuela', phone: '58' },
  { value: 'VG', code: 'VG', label: 'British Virgin Islands', phone: '1-284' },
  { value: 'VI', code: 'VI', label: 'US Virgin Islands', phone: '1-340' },
  { value: 'VN', code: 'VN', label: 'Vietnam', phone: '84' },
  { value: 'VU', code: 'VU', label: 'Vanuatu', phone: '678' },
  { value: 'WF', code: 'WF', label: 'Wallis and Futuna', phone: '681' },
  { value: 'WS', code: 'WS', label: 'Samoa', phone: '685' },
  { value: 'XK', code: 'XK', label: 'Kosovo', phone: '383' },
  { value: 'YE', code: 'YE', label: 'Yemen', phone: '967' },
  { value: 'YT', code: 'YT', label: 'Mayotte', phone: '262' },
  { value: 'ZA', code: 'ZA', label: 'South Africa', phone: '27' },
  { value: 'ZM', code: 'ZM', label: 'Zambia', phone: '260' },
  { value: 'ZW', code: 'ZW', label: 'Zimbabwe', phone: '263' },
];

export const COUNTRY_ISO_OPTIONS_SORTED = [...COUNTRY_ISO_OPTIONS].sort((v1, v2) =>
  v1.label.localeCompare(v2.label),
);
