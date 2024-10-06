Release 6.1.2.

Changelog:
- Updated Documentation.
- New TESTING pulled from the LetsChat TESTING branch.
- Version number bumped from 6.1.1 to 6.1.2 which means 6.1.1 is now EOL.
- README.md has been updated to refer to the updated documentation and has been reworded to be more clear as well.
- The minimal directory has been removed, it was kept to test out Kwitter's transition to being the base for LetsChat and now that the transition is complete those files are now present in Kwitter instead.
- NeoChat has been renamed to NovaChat so all references to NeoChat have been renamed to NovaChat instead, this was done to avoid any conflicts with KDE's NeoChat Matrix client.
- During the renaming, the code was also cleaned up slightly to make it look better.
- The login page theming file has been renamed from login.css to game.css in order to increase compatibility with Kwitter, the login page can still be themed using the universal theming file which is how it is currently done by default.