# TODO

### HIGH!
- Figure out way to change special card defense value to Fully Block
- Lightbox to view character images (reusable for special cards)
- Client side patch support for Basic card classes

### MEDIUM
- BIGGY: For accurate stat aggregation, figure out how to account for full block counters, and instant damage....???
- Sp card image support
- Set up automatic export and backup of database (daily?)
- Tighten up Model schemas with basic validation

### LOW
- setup subtle animation to fire on Header indicating DB save and new item in Undo stack. Will hook into network methods on Service class (also TODO) ? Click on hamburger menu in Header to show list with Undo button
- somehow add url hash in /characters when navigating back from its linked special card page (request referrer?)
- Set up Trash Bin collection / transfer system
- Display aggregate stats per character
- Undo system (create alongside Trash bin system)
- filter sp cards WITHOUT refreshing
- Axios is possibly freezing UI on sp card requests (all requests?) investigate, possibly replace, possibly just use pagination for performance sake (mongoose-paginate)
- Proper Signout button logic (component probably)
- Redo "Home" button
