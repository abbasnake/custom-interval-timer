# custom-hiit

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Run your unit tests
```
npm run test:unit
```

### TODOS
- when holding + or - increment decrement inceases (@mousedown, perhaps no need for @click)
- unit tests
- e2e tests
- object immutability (Object.freeze...?)
- loops can be as components that can be mixed and matched and saved and loaded
- when custom timer down to 0 and hold decrement the option to delete is available
- desktop mode
- css constants (background color, text color etc)
- swipe functionality
- maybe move mutations to actions, so that more than one mutation can be used in single dispatch/commit
- add placeholder/lazy loading
- refactor SVG buttons to use one component and then create a component for each svg
- make small png icon for mobile/splash screen
- add sets progression bar as well
- screen brighter on pause
- color constants are in two places (scss variables and util/constants)
- porper testing atleast on Android
- if user sets one of timers to 00:00, ignore it
- style timer numbers to always be the same width