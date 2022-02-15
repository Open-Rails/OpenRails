import { DynamicModule } from '@nestjs/common';
export interface ConfigModuleOptions {
    path?: string;
    isGlobal?: boolean;
}
export declare class ConfigModule {
    static forRoot(options?: ConfigModuleOptions): DynamicModule;
}
