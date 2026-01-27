export interface Model {
    id: number;
    name: string;
}

export interface ModelVersion {
    id: number;
    version: string;
    train_sample_size: number;
    val_loss: number | null;
    val_accuracy: number | null;
    val_mae: number | null;

    model: Model;
}
