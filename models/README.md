# Models Directory

This directory should contain the AI model files for the Smart Doctor platform.

## Downloading Models

To download the models from Hugging Face, you can clone them directly:

```bash
# Install git-lfs for large file support
git lfs install

# Clone the Brain Tumor model space
git clone https://huggingface.co/spaces/Mostafa3x/Brain_Tumor1

# Copy the models directory
cp -r Brain_Tumor1/models/* ./models/
```

## Model Sources

| Model | HuggingFace URL |
|-------|-----------------|
| Brain Tumor Detection | [Mostafa3x/Brain_Tumor1](https://huggingface.co/spaces/Mostafa3x/Brain_Tumor1/tree/main/models) |
| Image Prediction | [Mostafa3x/ahmed_predict_image](https://huggingface.co/spaces/Mostafa3x/ahmed_predict_image) |
| Eye Disease Detection | [Mostafa3x/eye_model](https://huggingface.co/spaces/Mostafa3x/eye_model) |

## Training Notebooks

- [Brain Tumor Classification](https://github.com/MostafaAyman3/BrainTumor/blob/main/Brain_Tumor_Classification.ipynb)
- [Brain Tumor Segmentation (ResUNet)](https://github.com/MostafaAyman3/BrainTumor/blob/main/Brain_MRI_Detection_%7C_Segmentation_%7C_ResUNet_final.ipynb)

## Expected Files

After downloading, this directory should contain:
- `classification_model.h5` - Brain tumor classification model
- `segmentation_model.h5` - Brain tumor segmentation model (ResUNet)
- Additional model weights as needed
