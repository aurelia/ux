export declare type LifecycleMethodName = 'canActivate' | 'activate' | 'canDeactivate' | 'deactivate';
/**
 * Call a lifecycle method on a viewModel if it exists.
 * @function
 * @param instance The viewModel instance.
 * @param name The lifecycle method name.
 * @param model The model to pass to the lifecycle method.
 * @returns Promise The result of the lifecycle method.
 */
export declare function invokeLifecycle(instance: object, name: LifecycleMethodName, model?: any): Promise<any>;
