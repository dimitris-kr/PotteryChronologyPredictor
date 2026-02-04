export interface Task {
    id: number;
    name: string;
}
export interface Target {
    id: number;
    name: string;
}

export interface FeatureSet {
    id: number;
    feature_type: string;
    data_type: string;
    current_version: string;
}

export interface Model {
    id: number;
    name: string;

    task: Task;
    targets: Target[];
    feature_sets: FeatureSet[];

}

export interface ModelVersion {
    id: number;
    version: string;
    train_sample_size: number;
    val_loss: number | null;
    val_accuracy: number | null;
    val_mae: number | null;
    created_at: Date;
    model: Model;
}
