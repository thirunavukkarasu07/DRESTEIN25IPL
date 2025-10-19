import Team from "../models/Team.js";

export const listTeams = async (req, res) => {
  try {
    const teams = await Team.find().select("teamName email approved purseRemaining role");
    res.json({ teams });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const approveTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id);
    if (!team) return res.status(404).json({ message: "Team not found" });
    team.approved = true;
    await team.save();
    res.json({ message: "Team approved", team: { id: team._id, teamName: team.teamName, approved: team.approved } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
