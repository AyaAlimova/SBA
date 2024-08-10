// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup  = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

function getLearnerData(course, ag, submissions){

  if(CourseInfo.course_id !== CourseInfo.course_id){
    throw new Error("Invalid input");
  }

  const assignments = {};

  for(const assignment of AssignmentGroup.assignments){
    try {
      if (assignment.points_possible === undefined || assignment.points_possible === null) {
        throw new Error("Value should be a number");
      }
      if (isNaN(assignment.points_possible) || assignment.points_possible <= 0) {
        throw new Error("You can't divide by zero");
      }
    assignments[assignment.id] = assignment;
  } catch (err) {
    console.log(`Error with assignment ${assignment.id}: ${err.message}`);
  }
  }

  const learners = {}
    //submissions is not iterable
    for(const submission of submissions){
   
    const learnerId = submission.learner_id;
    const assignmentId = submission.assignment_id;
    const assignment = assignments[assignmentId];
    const dueDate = new Date(assignment.due_at);
    const submissionDate = new Date(submission.submitted_at);
    const currentDate = new Date();

    if(dueDate > currentDate){
      continue;
    }

    let score = submission.score;

    if(submissionDate > dueDate){
      score = score - (0.1 * assignment.points_possible)
    }

    let totalScore = 0;
    let totalPoints = 0;

    totalScore = totalScore + score;
    totalPoints = totalPoints + assignment.points_possible;

    learners[learnerId].totalScore = learners[learnerId].totalScore + score;
    learners[learnerId].totalPoints = learners[learnerId].totalPoints + assignment.points_possible;

    let scores = (score/assignment.points_possible);
    
    const result = [];
    for(let learner_id in learners){
      const learner = learners[learner_id];
      const avg = (learner.totalScore / learner.totalPoints);

      const learnerData = {
        id:learnerId,
        avg: avg
      };

      for(let assignmentId in learner.scores){
        learnerData[assignmentId] = learner.scores[assignmentId];
      }
      result.push(learnerData);
    }

      return result;
  }
   

}
getLearnerData();