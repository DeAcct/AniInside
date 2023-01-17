import { Component } from "@/Component";
/**
 *
 * @param {string} eventName
 * @param {{data:any | undefined;target:Component | HTMLElement}} param1
 * @returns
 */

export function useCustomEvent(eventName, { detail, target }) {
  const event = new CustomEvent(eventName, { detail });
  if (target) {
    target.dispatchEvent(event);
    return;
  }
  dispatchEvent(event);
}
