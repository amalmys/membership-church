const Member = require('../models/Member');

exports.addMember = async (req, res) => {
  const member = new Member(req.body);
  await member.save();
  res.status(201).json(member);
};

exports.getMembers = async (req, res) => {
  const members = await Member.find();
  res.json(members);
};

exports.updateMember = async (req, res) => {
  const updated = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteMember = async (req, res) => {
  await Member.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Member deleted' });
};

exports.getMemberById = async (req, res) => {
  const member = await Member.findById(req.params.id);
  res.json(member);
};
