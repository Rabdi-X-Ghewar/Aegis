import mongoose from "mongoose";

const walletLinkSchema = new mongoose.Schema({
    ocid: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    walletAddress: {
        type: String,
        required: true
    },
    signature: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Pre-save middleware to update the updatedAt field
walletLinkSchema.pre('findOneAndUpdate', function () {
    this.set({ updatedAt: new Date() });
});

export const WalletLink = mongoose.model('WalletLink', walletLinkSchema);