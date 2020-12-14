/* eslint-disable no-extend-native */

export default function Register() {

  Array.prototype.clone = function() {
    return this.slice(0);
  }

  Array.prototype.deepClone = function() {
    return JSON.parse(JSON.stringify(this));
  }

  String.prototype.isNullOrWhitespace = function() {
    return !this || !this.trim();
  }
}