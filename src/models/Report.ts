import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
  facility: { type: Number, required: true },
  name: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  text: { type: String, required: true },
  category: {type: String, required: true},
  complete: { type: Boolean, default: false },
  completedDate: { type: String, default: null},
  completedBy: { type: String, default: null}
});

export default mongoose.models.Report || mongoose.model('Report', ReportSchema);
