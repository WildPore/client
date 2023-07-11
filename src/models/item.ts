// TODO I'm adding null to the types of id and name.
// I'm doing this so that I can initialize a state with Item
// by saying that these properties are null.
// I don't know if that's the best choice. What trade-off am
// I making?

export interface Item {
	id: number | null;
	name: string | null;
	maxHeld?: number;
	ordering?: number;
}
