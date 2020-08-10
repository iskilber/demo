export interface DaoStoreConfig<T> {
  compare?: (prev: T, next: T) => boolean;
}
