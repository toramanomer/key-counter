import { Injectable } from '@nestjs/common'

/**
 * @description
 * A service that keeps track of the occurrence count of keys.
 */
@Injectable()
export class KeyCounterService {
	private keyCounts = new Map<string, number>()

	/**
	 * @description
	 * Increments the occurrence count of a key.
	 *
	 * @param key The key to increment the count of.
	 */
	incrementKeyCount(key: string): void {
		const count = this.keyCounts.get(key) ?? 0
		this.keyCounts.set(key, count + 1)
	}

	/**
	 * @description
	 * Retrieves the occurrence count of a key, or `0` if the key does not exist.
	 *
	 * @param key The key to retrieve the count of.
	 * @returns The occurrence count of the key.
	 */
	getKeyCount(key: string): string {
		const count = this.keyCounts.get(key) ?? 0
		return count.toString()
	}
}
