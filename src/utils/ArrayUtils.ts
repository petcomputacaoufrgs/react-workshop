type filter<T> = (value: T) => boolean

class ArrayUtils {
	isNotEmpty = <T>(list?: T[]) => !this.isEmpty(list)  
	
	isEmpty = <T>(list?: T[]) => list === undefined || list.length === 0  

	suffle = <T>(list: T[]) => {
		list.sort(() => Math.random() - 0.5)
	}

	randomItem = <T>(list: T[]): T => {
		return list[Math.floor(Math.random() * list.length)]
	}
}

export default new ArrayUtils()
