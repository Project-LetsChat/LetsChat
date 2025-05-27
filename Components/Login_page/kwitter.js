/*Copyright (C) 2023-2025 Bhargav Ekbote <bhargavsdeal@gmail.com>
This file is part of LetsChat.

LetsChat is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

LetsChat is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License along with LetsChat. If not, see <https://www.gnu.org/licenses/>.*/

function addUser() {

  user_name = document.getElementById("user_name").value;

  localStorage.setItem("user_name", user_name);
  
    window.location = "LetsChat_room.html";
}
