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
- design
- pwa stuff
- object immutability (Object.freeze...?)
- running screen countdown timer should be immutable
- loops can be as components that can be mixed and matched and saved and loaded
- when custom timer down to 0 and hold decrement the option to delete is available
- perhaps need to add number of block, otherwise when many blocks can get confusing
- desktop mode
- css constants (background color, text color etc)
- make github page
- remove button outline for corner buttons
- swipe functionality
- delete inner timer rom button with arrow
- primary/secondary block color
- global repeat time
- maybe move mutations to actions, so that more than one mutation can be used in single dispatch/commit
- check mp3 playback (for decreased soundfile size)
- add placeholder/lazy loading
- refactor SVG buttons to use one component and then create a component for each svg